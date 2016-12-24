function scrape() {
    var config = {
        query: 'table#ctlActivityTable',
        columns: {
            date: 1,
            payee: 2,
            category: null,
            memo: null,
            outflow: 4,
            inflow: 5
        },
        dateFormat: 'DD/MM/YY',
        filename: 'union-transactions-{date}.csv'
    };

    var table = [];

    $(config.query).find('tr').each(function(itr, tr) {
        var row = [];
        $(tr).find('td').each(function(itd, td) {
            row.push($(td).text().trim());
        });
        if (row.length != 0) {
            table.push({
                date: moment(row[config.columns.date], config.dateFormat).format('YYYY-MM-DD'),
                payee: row[config.columns.payee],
                category: row[config.columns.category],
                memo: row[config.columns.memo],
                outflow: row[config.columns.outflow],
                inflow: row[config.columns.inflow],
            });
        }
    });

    var filename = config.filename;
    filename = filename.replace('{date}', moment().format('YYYY-MM-DD'));

    saveAs(makeYnabCsv(table), filename);
}

function makeYnabCsv(table) {
    function quote(s) {
        if (!s) {
            return s;
        }
        return '"' + s.replace(/"/g, '""') + '"';
    }

    var data = [];
    data.push('Date,Payee,Category,Memo,Outflow,Inflow');
    for (var i = 0; i < table.length; i++) {
        data.push([
            quote(table[i].date),
            quote(table[i].payee),
            quote(table[i].category),
            quote(table[i].memo),
            quote(table[i].outflow),
            quote(table[i].inflo),
        ].join());
    }
    return data.join('\n');
}

function saveAs(data, filename) {
    var link = document.createElement('a');
    var url = 'data:text/plain; charset=UTF-8,' + encodeURIComponent(data);
    link.href = url;
    link.download = filename;
    link.click();
}
