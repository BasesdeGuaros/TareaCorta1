"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var apiorderproducts_service_1 = require("./apiorderproducts.service");
describe('ApiorderproductsService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(apiorderproducts_service_1.ApiorderproductsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=apiorderproducts.service.spec.js.map