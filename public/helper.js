$(document).ready(function () {
    let columnMap = [
        { "data": "subCategory" },
        { "data": "title" },
        { "data": "price" },
        { "data": "popularity" }
    ];
    $('#example')
    .on('preXhr.dt', function ( e, settings, data ) {
        console.log(e, settings,data);
        let tmp = data.order[0];
        data.limit   = data.length,
        data.skip    = data.start,
        data.q       = data.search.value,
        data.orderby = columnMap[tmp.column].data,
        data.order   = tmp.dir;
        delete data.columns;
        delete data.search;
        delete data.length;
        delete data.start;
    }).DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/list",
            // "dataSrc": "",
            
        },
        "columns": columnMap,
        "order": [[ 3, "desc" ]],
        // "dom":'<fltip>'
    }).on( 'error.dt', function ( e, settings, techNote, message ) {
        console.log( 'An error has been reported by DataTables: ', message );
    } )
});