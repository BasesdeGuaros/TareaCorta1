"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var apiuser_service_1 = require("./apiuser.service");
describe('ApiuserService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(apiuser_service_1.ApiuserService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=apiuser.service.spec.js.map