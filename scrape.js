function scrape() {
    // maybe create a config screen for this?
    var PAYEES = {
        'ויזה כ.א.ל י': 'קנדה',
    }

    function parseDate(dateString) {
        var regex = /(\d{2})\/(\d{2})\/(\d{2})/;
        var values = regex.exec(dateString);
        return new Date(2000 + parseInt(values[3]), parseInt(values[2] - 1), parseInt(values[1]));
    }

    var table = []
    $('table#ctlActivityTable').find('tr').each(function(itr, tr) {
        var row = [];
        $(tr).find('td').each(function(itd, td) {
            row.push($(td).text().trim());
        });
        if (row.length != 0) {
            table.push({
                date: parseDate(row[1]).toISOString().slice(0, 10),
                payee: PAYEES[row[2]] ? PAYEES[row[2]] : row[2],
                category: '',
                memo: row[2],
                outflow: row[4],
                inflow: row[5],
            });
        }
    });

    saveAs(makeYnabCsv(table), 'ynab-transactions-' + new Date().toISOString().slice(0, 10) + '.csv');
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
    var url = "data:text/plain; charset=UTF-8," + encodeURIComponent(data);
    link.href = url;
    link.download = filename;
    link.click();
}
