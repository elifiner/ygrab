import sys
from lxml import html
from datetime import datetime

PAYEES = {
    'ויזה כ.א.ל י': 'קנדה'
}

root = html.parse('/Users/eli/Downloads/ubi-account.html').getroot()
table = root.cssselect('table#ctlActivityTable')[0]

with open('/Users/eli/Downloads/import-transactions.csv', 'w', encoding='utf8') as f:

    f.write('Date,Payee,Category,Memo,Outflow,Inflow\n')
    for tr in table.cssselect('tr'):
        cells = [td.text_content().strip() for td in tr.cssselect('td')]
        if not cells:
            continue

        date = datetime.strptime(cells[1], '%d/%m/%y').strftime('%Y-%m-%d')
        payee = PAYEES.get(cells[2], cells[2])
        category = ''
        memo = cells[2]
        outflow=cells[4]
        inflow=cells[5]

        data = [date, payee, category, memo, outflow, inflow]
        data = [f.replace('"', '""') for f in data]
        data = ['"{}"'.format(f) for f in data]

        f.write(','.join(data) + '\n')
