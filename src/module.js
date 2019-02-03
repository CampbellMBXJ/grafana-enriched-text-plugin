import _ from 'lodash';
import {
    PanelCtrl,
    MetricsPanelCtrl,
    loadPluginCss
} from 'grafana/app/plugins/sdk'; // will be resolved to app/plugins/sdk
import './css/panel.base.scss';
import './css/panel.dark.scss';
import './css/panel.light.scss';

const defaultContent = "\n<h4>Tittle</h4><p>Example Template</p>\n{{{{Metrics: $(metric)-$(max(metricNum))}}}}\n<p>use html tags in the template for styling\n";

export class TagCtrl extends MetricsPanelCtrl {

    constructor($scope, $injector, templateSrv, $sce) {
        super($scope, $injector);
        this.panelDefaults = {
            mode: 'html', // 'html', 'markdown', 'text'
            content: defaultContent,
            data: []
        };
        this.defaults();

        this.events.on('data-received', this.onDataReceived.bind(this));
        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('refresh', this.onRefresh.bind(this));
        this.events.on('render', this.onRender.bind(this));
        // let renderWhenChanged = function(scope) {
        //     let panel = scope.ctrl.panel;
        //     return [
        //         panel.content,
        //         panel.mode
        //     ].join();
        // };
        // $scope.$watch(renderWhenChanged, _.throttle(function() {
        //     this.render();
        // }, 100));
    }

    onRefresh() {
        this.render()
    }

    onRender() {
        this.parseContent(this.panel.content, this.data);
        this.renderingCompleted();
    }

    onDataReceived(data) {
        this.data = data;
        this.parseContent(this.panel.content, this.data);
    }

    getDataValue(dataLine, mod) {
        if (mod === "first") {
            return dataLine.datapoints[0][0];
        } else if (mod === "max") {
            let max = [-Infinity];
            for (let point in dataLine.datapoints) {
                if (dataLine.datapoints[point][0] > max) {
                    max = dataLine.datapoints[point];
                }
            }
            return max[0]
        }

    }

    onInitEditMode() {
        this.addEditorTab('Options', 'public/app/plugins/panel/text/editor.html');
    }

    getLine() {
        let start = 0;
        let end = 0;
        start = this.panel.content.indexOf("{{");
        end = this.panel.content.indexOf("}}")
        return [start + 2, end]
    }

    getTag(line, tag) {
        let start = 0;
        let end = 0;
        let middle = 0;
        while (start != -1) {
            start = line.indexOf("$(", start + 3);
            if (start != -1) {
                end = line.indexOf(")", start + 3);
                if (end != -1) {
                    let mod = "first";
                    let start_offset = 2;
                    let end_offset = 0;
                    if (line.substring(start + start_offset, start + 6).toLowerCase() === "max(" && line[end + 1] === ")") {
                        start_offset = 6;
                        end_offset = 1;
                        mod = "max";
                    }
                    if (line.substring(start + start_offset, end) === tag) {
                        return [start, end, start_offset, end_offset, mod]
                    }
                }
            }
        }
    }

    parseContent(content, data) {
        let line = this.getLine();
        let newLine = content.substring(line[0], line[1]);
        let allLines = "";
        let tags = [];
        for (let i = 0; i < data.length; i++) {
            let tag = data[i].target.split(" ")[0].split(".")[1];
            if (!tags.includes(tag)) {
                tags.push(tag);
            } else {
                tags = [tag];
                allLines += `${newLine}\n`;
                newLine = content.substring(line[0], line[1]);
            }
            let metric = this.getTag(newLine, tag);
            while (metric !== undefined) {
                let value = this.getDataValue(data[i], metric[4]);
                newLine = newLine.substring(0, metric[0]) + value + newLine.substring(metric[1] + metric[3] + 1, newLine.length);
                metric = this.getTag(newLine, tag);
            }
        }
        this.content = content.substring(0, line[0] - 2) + allLines + newLine + content.substring(line[1] + 2, content.length);
    }

    defaults() {
        if (this.panel.content === undefined || this.panel.content === undefined) {
            this.panel.mode = this.panelDefaults.mode;
            this.panel.content = this.panelDefaults.content;
        }

        if (this.panel.data === undefined) {
            this.panel.data === this.panelDefaults.data;
        }
    }

    link(scope, element) {
        this.initStyles();
    }

    initStyles() {
        window.System.import(this.panelPath + 'css/panel.base.css!');
        if (grafanaBootData.user.lightTheme) {
            window.System.import(this.panelPath + 'css/panel.light.css!');
        } else {
            window.System.import(this.panelPath + 'css/panel.dark.css!');
        }
    }

    get panelPath() {
        if (this._panelPath === undefined) {
            this._panelPath = `/public/plugins/${this.pluginId}/`;
        }
        return this._panelPath;
    }

}

TagCtrl.scrollable = true;
TagCtrl.templateUrl = 'partials/module.html';

export {
    TagCtrl as PanelCtrl
}