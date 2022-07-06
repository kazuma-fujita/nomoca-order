"use strict";
/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelSortDirection = exports.OrderType = exports.Type = exports.DeliveryType = exports.DeliveryStatus = exports.ModelAttributeTypes = void 0;
var ModelAttributeTypes;
(function (ModelAttributeTypes) {
    ModelAttributeTypes["binary"] = "binary";
    ModelAttributeTypes["binarySet"] = "binarySet";
    ModelAttributeTypes["bool"] = "bool";
    ModelAttributeTypes["list"] = "list";
    ModelAttributeTypes["map"] = "map";
    ModelAttributeTypes["number"] = "number";
    ModelAttributeTypes["numberSet"] = "numberSet";
    ModelAttributeTypes["string"] = "string";
    ModelAttributeTypes["stringSet"] = "stringSet";
    ModelAttributeTypes["_null"] = "_null";
})(ModelAttributeTypes = exports.ModelAttributeTypes || (exports.ModelAttributeTypes = {}));
var DeliveryStatus;
(function (DeliveryStatus) {
    DeliveryStatus["ordered"] = "ordered";
    DeliveryStatus["delivered"] = "delivered";
    DeliveryStatus["canceled"] = "canceled";
})(DeliveryStatus = exports.DeliveryStatus || (exports.DeliveryStatus = {}));
var DeliveryType;
(function (DeliveryType) {
    DeliveryType["regular"] = "regular";
    DeliveryType["express"] = "express";
    DeliveryType["subscription"] = "subscription";
})(DeliveryType = exports.DeliveryType || (exports.DeliveryType = {}));
var Type;
(function (Type) {
    Type["order"] = "order";
    Type["subscriptionOrder"] = "subscriptionOrder";
    Type["product"] = "product";
    Type["staff"] = "staff";
    Type["clinic"] = "clinic";
})(Type = exports.Type || (exports.Type = {}));
var OrderType;
(function (OrderType) {
    OrderType["singleOrder"] = "singleOrder";
    OrderType["subscriptionOrder"] = "subscriptionOrder";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var ModelSortDirection;
(function (ModelSortDirection) {
    ModelSortDirection["ASC"] = "ASC";
    ModelSortDirection["DESC"] = "DESC";
})(ModelSortDirection = exports.ModelSortDirection || (exports.ModelSortDirection = {}));
