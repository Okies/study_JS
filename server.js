const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(3000, () => console.log('Server started on port 3000 한글'));

let deptList = [
    {
        deptId: '2180',
        deptName: '통합IS팀 정보기획담당'
    }
];

let empList = [
    {
        id: '22210',
        name: '곽준창',
        deptId: '2180',
        deptName: '통합IS팀 정보기획담당'
    },
    {
      id: '12345',
      name: '한승덕',
      deptId: '2180',
      deptName: '통합IS팀 정보기획담당'
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

    let dept = deptList.filter(dept => dept.deptId == id)[0];

    if (!dept) {
        return res.status(404).json({ error: 'Unkown dept' });
    }

    return res.json(dept);
});

app.get('/emps/:id', cors(), (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (!id) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    let emp = empList.filter(emp => emp.id == id)[0];

    if (!emp) {
        return res.status(404).json({ error: 'Unkown emp' });
    }

    return res.json(emp);
});

app.get('/depts/:id/emps', cors(), (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (!id) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    let dept = deptList.filter(dept => dept.deptId == id)[0];

    if (!dept) {
        return res.status(404).json({ error: 'Unkown dept' });
    }

    return res.json(empList.filter(emp => emp.deptId==id));
});

app.post('/depts', cors(), (req, res) => {
    const deptName = req.body.deptName || '';
    const deptId = req.body.deptId || '';

    if (!deptName.length) {
        return res.status(400).json({ error: 'Incorrect name' });
    } else if (!deptId.length) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    const newDept = {
        deptId: deptId,
        deptName: deptName
    };

    deptList.push(newDept);

    return res.status(201).json(newDept);
});

app.put('/emps/:id', cors(), (req, res) => {
  const id = parseInt(req.params.id, 10);

  const deptId = req.body.deptId || '';
  const deptName = req.body.deptName || '';

  if (!id) {
      return res.status(400).json({ error: 'Incorrect emp id' });
  }

  let emp = empList.filter(emp => emp.id == id)[0];

  if (!emp) {
      return res.status(404).json({ error: 'Unkown emp' });
  }

  if (!deptName.length) {
      return res.status(400).json({ error: 'Incorrect name' });
  } else if (!deptId.length) {
      return res.status(400).json({ error: 'Incorrect id' });
  }

  emp.deptId = deptId;
  emp.deptName = deptName;

  return res.json(emp);
});
