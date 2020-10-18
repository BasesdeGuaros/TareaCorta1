"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var apiproducts_service_1 = require("./apiproducts.service");
describe('ApiproductsService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(apiproducts_service_1.ApiproductsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=apiproducts.service.spec.js.map