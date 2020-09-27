"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var apiproducer_service_1 = require("./apiproducer.service");
describe('ApiproducerService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(apiproducer_service_1.ApiproducerService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=apiproducer.service.spec.js.map