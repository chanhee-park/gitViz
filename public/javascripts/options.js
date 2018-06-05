let $openButton = $('#category-select-zone-open-button');
let $closeButton = $('#category-select-zone-close-button');
let $selectZone = $('.category-select-zone');

let $fieldList = $('.field-list');

const MINIMUM_CNT_OF_KEYWORD = 0;

$openButton.click(function () {
    $selectZone.css({
        left: 10
    })
});

$closeButton.click(function () {
    $selectZone.css({
        left: -520
    })
});

let categorySelectZone = (fields) => {
    this.selected = [];
    let that = this;
    _.forEach(fields, function (field, fieldName) {
        let htmlStr = "<div class='field'>" +
            "<div class='field-name'>" + fieldName + "</div>" +
            "<div class='category-list'>";
        _.forEach(field.keywords, function (keyword) {
            if(field.keywordCounts[keyword]>MINIMUM_CNT_OF_KEYWORD){
                selected.push(keyword);
                htmlStr += "<div class='category selected'>" + keyword + "</div>";
            }
        });
        htmlStr += "</div></div>";
        $fieldList.append(htmlStr);
    });

    $('.category').click(function () {
        let keyword = $(this).html();
        if (_.indexOf(that.selected, keyword) >= 0) {
            that.selected.splice(_.indexOf(that.selected, keyword), 1);
            $(this).removeClass('selected');
            $(this).addClass('unselected');
        } else {
            that.selected.push(keyword);
            $(this).removeClass('unselected');
            $(this).addClass('selected');
        }
        d3.select('#userNetworkRenderer > *').remove();
        let selectedField = {};
        _.forEach(fields, function (field, fieldName) {
            selectedField[fieldName] = { keywords: [] };
            _.forEach(field.keywords, async function (keyword) {
                if (_.indexOf(that.selected, keyword) >= 0) {
                    selectedField[fieldName]['keywords'].push(keyword);
                }
            });
        });
        userVis({ users: Data.USERS, links: Data.LINKS, fields: selectedField });
    })

};
