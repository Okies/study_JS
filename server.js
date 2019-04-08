const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => console.log('Server started on port 3000 한글'));

let deptList = [
    {
        id: '2180',
        name: '통합IS팀 정보기획담당'
    }
];

let empList = [
    {
        id: '22210',
        name: '곽준창',
        deptid: '2180',
        deptname: '통합IS팀 정보기획담당'
    }
];

app.get('/', (req, res) => res.json('Hello World'));

app.get('/depts', cors(), (req, res) => res.json(deptList));

app.get('/emps', cors(), (req, res) => res.json(empList));

app.get('/depts/:id', cors(), (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if (!id) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    let dept = deptList.filter(dept => dept.id == id)[0];

    if (!dept) {
        return res.status(404).json({ error: 'Unkown dept' });
    }

    return res.json(dept);
});

app.get('/depts/:id/emps', cors(), (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (!id) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    let dept = deptList.filter(dept => dept.id == id)[0];

    if (!dept) {
        return res.status(404).json({ error: 'Unkown dept' });
    }

    return res.json(empList.filter(emp => emp.deptid=id));
});

app.post('/depts', cors(), (req, res) => {
    const name = req.body.name || '';
    const id = req.body.id || '';

    if (!name.length) {
        return res.status(400).json({ error: 'Incorrect name' });
    } else if (!id.length) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    const newDept = {
        id: id,
        name: name
    };

    deptList.push(newDept);

    return res.status(201).json(newDept);
});