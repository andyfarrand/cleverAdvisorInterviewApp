﻿module App {


    angular.module("app").filter("startFrom", function () {
        return function (input, start) {
            if (!input) return [];
            start = +start; //parse to int
            return input.slice(start);
        }
    });
}