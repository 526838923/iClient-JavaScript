﻿/**
 * Class:ChartQueryService
 * 海图查询服务
 */
require('./ServiceBase');
require('../../../Core/iServer/ChartQueryService');

ol.supermap.ChartQueryService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.ChartQueryService, ol.supermap.ServiceBase);

/**
 * @param params
 * <ChartQueryParameters>
 * @param resultFormat
 */
ol.supermap.ChartQueryService.prototype.queryChart = function (params, resultFormat) {
    var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
    var chartQueryParameters = new SuperMap.REST.ChartQueryParameters(param);
    var chartQueryService = new SuperMap.REST.ChartQueryService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: format
    });
    chartQueryService.processAsync(chartQueryParameters);
    return me;
};

ol.supermap.ChartQueryService.prototype._processParams = function (params) {
    if (!params) {
        return {};
    }
    params.returnContent = (params.returnContent == null) ? true : params.returnContent;
    if (params.filter) {
        params.chartQueryFilterParameters = ol.supermap.Util.isArray(params.filter) ? params.filter : [params.filter];
    }
    if (params.bounds) {
        params.bounds = new SuperMap.Bounds(
            params.bounds[0],
            params.bounds[1],
            params.bounds[2],
            params.bounds[3]
        );
    }
};
ol.supermap.ChartQueryService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : Format.GEOJSON;
};
module.exports = ol.supermap.ChartQueryService;