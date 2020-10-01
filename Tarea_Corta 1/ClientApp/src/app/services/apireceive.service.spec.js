"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var apireceive_service_1 = require("./apireceive.service");
describe('ApireceiveService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(apireceive_service_1.ApireceiveService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=apireceive.service.spec.js.map