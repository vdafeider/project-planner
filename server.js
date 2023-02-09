const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

// solves CORS issue that frond and back on one origin
app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });

// function - gets data from array inside json file, and creates the file if it doesn't exist
function getData(){
    try {
        const content = fs.readFileSync('array.json')
        return JSON.parse(content)
    }catch(e){ // file non-existent
        const array=[]
        fs.writeFileSync('array.json', array)
        return array
    }
}

function addItem(obj){
    const array = getData()
    array.push(obj)
    array.forEach((obj, ind)=> obj.id=ind+1)
    fs.writeFileSync('array.json', JSON.stringify(array))
}

function deleteItem(id){
    const array = getData()
    array.splice(Number(id)-1, 1)
    array.forEach((obj, ind)=> obj.id=ind+1)
    fs.writeFileSync('array.json', JSON.stringify(array))
}

// create new object in array
app.post('/api/', (req, resp)=>{
    const newObject = { id:Number, title:req.query.title, description:req.query.description}
    addItem(newObject)
    resp.send('Success')
})

// check whether array exists and return it
app.get('/api', (req, resp)=>{
    const array = getData()
    resp.send(JSON.stringify(array))
})

// delete object by id
app.delete('/api/:id', (req, resp) => {
    const id = req.params.id
    deleteItem(id)
    resp.send('Success')
})

// modify by id
app.put('/api/', (req, resp) => {
    const tit = req.query.title || 'none'
    const id =  req.query.id 
    const desc =  req.query.description || 'none'
    const array = getData()
    if(array.length>=id){
        if (tit!='none'&&desc!='none'){
            array[id-1]={id:id, title: tit, description: desc}
            fs.writeFileSync('array.json', JSON.stringify(array))
            resp.send('Success')
        } else if (tit=='none'&&desc!='none'){
            array[id-1].description=desc
            fs.writeFileSync('array.json', JSON.stringify(array))
            resp.send('Success')
        }else if (tit!='none'&&desc=='none'){
            array[id-1].title=tit
            fs.writeFileSync('array.json', JSON.stringify(array))
            resp.send('Success')
        }
    }else{
         resp.send('Item does not exist')
    }
}
)

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html'));
    });
}

app.listen(port, ()=>console.log('Listening engaged'))