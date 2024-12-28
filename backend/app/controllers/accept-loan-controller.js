import RequestLoanModel from '../models/service-request-loan-model.js';
import AccountModel from '../models/account-model.js';

// Endpoint 1: Validar solicitudes y actualizar estados
export const validateLoanRequests = async (req, res) => {
  try {
    // Obtener todas las solicitudes
    const loanRequests = await RequestLoanModel.findAll();

    // Agrupar por account_id
    const accountLoans = loanRequests.reduce((acc, loan) => {
      if (!acc[loan.account_id]) acc[loan.account_id] = [];
      acc[loan.account_id].push(loan);
      return acc;
    }, {});

    // Validar y actualizar estados
    for (const accountId in accountLoans) {
      const loans = accountLoans[accountId];
      const approvedLoan = loans.find((loan) => loan.status === 'Aprobada');
      if (approvedLoan) {
        // Cambiar a "Rechazada" todas las demás solicitudes del mismo account_id
        for (const loan of loans) {
          if (loan.status === 'Pendiente') {
            await RequestLoanModel.update(
              { status: 'Rechazada' },
              { where: { id: loan.id } }
            );
          }
        }
      }
    }

    res.status(200).json({ message: 'Estados actualizados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar las solicitudes de préstamos' });
  }
};

// Endpoint 2: Obtener solicitudes con datos de cuentas
export const getLoanRequestsWithAccountDetails = async (req, res) => {
  try {
    // Consultar todas las solicitudes de préstamos
    const loanRequests = await RequestLoanModel.findAll();

    // Obtener todos los accounts (clientes) en una sola consulta
    const accounts = await AccountModel.findAll();

    // Crear un mapa para buscar cuentas por ID más rápidamente
    const accountMap = {};
    accounts.forEach((account) => {
      accountMap[account.id] = {
        name: account.name,
        last_name: account.last_name,
        phone: account.phone,
        email: account.email,
      };
    });

    // Relacionar solicitudes con la información de cuentas
    const result = loanRequests.map((loan) => ({
      ...loan.dataValues,
      account: accountMap[loan.account_id] || null, // Agregar datos de cuenta si existe
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las solicitudes de préstamos' });
  }
};

// Endpoint 3: Actualizar estado de una solicitud de préstamo
export const updateLoanRequestStatus = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la solicitud desde los parámetros
    const { status } = req.body; // Obtener el nuevo estado desde el cuerpo de la solicitud
  
    try {
      // Validar el nuevo estado
      if (!['Aprobada', 'Rechazada'].includes(status)) {
        return res.status(400).json({
          error: "El campo 'status' solo puede ser 'Aprobada' o 'Rechazada'.",
        });
      }
  
      // Buscar la solicitud de préstamo
      const loanRequest = await RequestLoanModel.findByPk(id);
  
      // Verificar si existe la solicitud
      if (!loanRequest) {
        return res.status(404).json({
          error: `No se encontró ninguna solicitud de préstamo con el ID ${id}.`,
        });
      }
  
      // Actualizar el estado
      loanRequest.status = status;
      await loanRequest.save();
  
      // Respuesta exitosa
      return res.status(200).json({
        message: `El estado de la solicitud con ID ${id} se actualizó a '${status}'.`,
        loanRequest, // Devolver los datos actualizados
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Ocurrió un error al intentar actualizar el estado de la solicitud.',
      });
    }
  };