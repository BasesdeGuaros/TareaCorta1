"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var apicustomer_service_1 = require("./apicustomer.service");
describe('ApicustomerService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(apicustomer_service_1.ApicustomerService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=apicustomer.service.spec.js.map