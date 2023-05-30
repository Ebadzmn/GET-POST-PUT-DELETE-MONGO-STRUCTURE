const mongoose = require ('mongoose')
const {Schema} = mongoose;


const PostSchema = new Schema (
    {
        title:{
            type : String,
            min: 6,
            max : 100,
            required: true,
        },




        desc: {
           type: String,
           required: true,
        }
    },
    {timestamps : true , versionKey:false}
) ;



const Post = mongoose.model("Post", PostSchema);

module.exports = Post;