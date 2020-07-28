import Neode from 'neode';
 
const instance = new Neode('bolt://localhost:7687', 'neo4j', '123456');
const items = [
    {id:1,type:"prefix",description:"Primeiro prefixo"},
    {id:2,type:"prefix",description:"Segundo prefixo"},
    {id:3,type:"prefix",description:"Terceiro prefixo"},
    {id:4,type:"sufix",description:"Primeiro sufixo"},
    {id:5,type:"sufix",description:"Segundo sufixo"},
] 

console.log('Criando o model no neo4j')

instance.model('Item', {
    id: {
        //primary: true,
        type: 'number',
    },
    type: {
        type: 'string',
    },
    description: {
        type: 'string',
    },
});

export const ItemResolver = {
    Query: {
      async items(_,args){
          let resp = await instance.cypher('MATCH (item:Item {type: $type}) RETURN item', {type: args.type})
          console.log(resp.records.length)
          let items = []

          resp.records.forEach(item=>{
                items.push(item.toObject().item.properties)
          })
          return items/* .filter(item => item.type === args.type);   */
    /* .then(res => {
        let items = []
        res.records.forEach(item=>{
            i
        });
        return items.filter(item => item.type === args.type); 
    }) */
      }
    },
  
    Mutation:{
        async saveItem(_,args){
            let item = args.item;
            item.id = Math.floor(Math.random()*1000)
            /*items.push(item) */
            let response = await instance.create('Item', {
                type:item.type,
                description:item.description,
                id:item.id
            })
            return response.toJson()
        }
    }
};