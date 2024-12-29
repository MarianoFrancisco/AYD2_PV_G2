import { execSync } from 'child_process';

const testFiles = [
    'tests/integration/controllers/credit-card.test.js',
    'tests/integration/controllers/debit-card.test.js',
    'tests/integration/controllers/deposit.test.js',
    'tests/integration/controllers/withdrawal.test.js',
    'tests/integration/controllers/service-payment-cashier.test.js'
];

try {
    testFiles.forEach((file) => {
        console.log(`\n=== Running tests in ${file} ===\n`);
        execSync(`npx jest ${file} --selectProjects=integration`, { stdio: 'inherit' });
    });
    console.log('\n✅ All tests ran successfully.');
} catch (error) {
    console.error('\n❌ Some tests failed. See above for details.');
    process.exit(1);
}
