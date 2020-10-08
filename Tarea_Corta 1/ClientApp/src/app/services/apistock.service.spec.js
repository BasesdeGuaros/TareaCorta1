"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var apistock_service_1 = require("./apistock.service");
describe('ApistockService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(apistock_service_1.ApistockService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=apistock.service.spec.js.map