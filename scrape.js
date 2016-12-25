var Ygrab = {
    
    // =========================== Scrapers ===========================

    scrapeUnionTransactions: function (site) {
        var table = this._getTableValues('table#ctlActivityTable');
        var data = []
        for (var i = 0; i < table.length; i++) {
            var row = table[i];
            data.push({
                date: moment(row[1], 'DD/MM/YY').format('YYYY-MM-DD'),
                payee: row[2],
                category: null,
                memo: null,
                outflow: row[4],
                inflow: row[5],
            });
        }
        data = data.slice(1, data.length);
        this._saveAs(this._makeYnabCsv(data), this._makeFilename(site.filename));
    },

    scrapeUnionCreditCard: function (site) {
        var table = this._getTableValues('table#ctlRegularTransactions');
        var data = []
        for (var i = 0; i < table.length; i++) {
            var row = table[i];
            data.push({
                date: moment(row[0], 'DD/MM/YY').format('YYYY-MM-DD'),
                payee: row[1],
                category: null,
                memo: null,
                outflow: row[4],
                inflow: null,
            });
        }
        data = data.slice(1, data.length - 1);
        this._saveAs(this._makeYnabCsv(data), this._makeFilename(site.filename));
    },

    // =========================== Utilities ===========================

    _getTableValues: function (query) {
        var table = [];
        $(query).find('tr').each(function(itr, tr) {
            var row = [];
            $(tr).find('td').each(function(itd, td) {
                row.push($(td).text().trim());
            });
            table.push(row);
        });
        return table;
    },

    _makeFilename: function (template) {
        var filename = template;
        var filename = filename.replace('{date}', moment().format('YYYY-MM-DD'));
        return filename;
    },

    _makeYnabCsv: function (table) {
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
                quote(table[i].inflow),
            ].join());
        }
        return data.join('\n');
    },

    _saveAs: function (data, filename) {
        var link = document.createElement('a');
        var url = 'data:text/plain; charset=UTF-8,' + encodeURIComponent(data);
        link.href = url;
        link.download = filename;
        link.click();
    }
}
