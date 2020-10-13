"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var apiorder_service_1 = require("./apiorder.service");
describe('ApiorderService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(apiorder_service_1.ApiorderService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=apiorder.service.spec.js.map