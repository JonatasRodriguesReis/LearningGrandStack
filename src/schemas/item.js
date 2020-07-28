export const item = `
  type Item {
    id: String,
    type: String,
    description: String
  },

  extend type Query {
    items(type:String):[Item],
  },

  input ItemInput{
    type:String,
    description:String
  }
  
  extend type Mutation{
    saveItem(item:ItemInput):Item
  }
`