# Diagnosis

## 1. Unit Test Failure
* **Step Name:** Run tests
* **Error Message:** `expect(received).toBe(expected) // Object.is equality` or `Expected: 90, Received: 100`
* **Explanation:** `formatCurrency` returns an object, but the test uses `.toBe()` which checks for referential equality. It should use `.toEqual()` to deeply compare object values. `calculateDiscount` asserted that `100 - 10% = 100` instead of `90`.

## 2. Dependency Configuration
* **Step Name:** Install dependencies
* **Error Message:** Expected clean install, but missing dependencies or unreliable build.
* **Explanation:** The workflow was using `npm install` which can update versions and create non-reproducible builds. We need to use `npm ci` which installs strictly from `package-lock.json`. Also, `package-lock.json` might have been out of sync.

## 3. Workflow Configuration
* **Step Name:** Run tests (in test job)
* **Error Message:** `npm: command not found` or similar, or missing modules
* **Explanation:** The `test` job ran in parallel with `install` (missing `needs: install`). Further, the `test` job lacked the `actions/checkout` and dependency installation steps (`npm ci`), meaning it had no code and no `node_modules` to run the tests.
