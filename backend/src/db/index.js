import dotenv from "dotenv"
dotenv.config();
import pkg from "pg"
const {Pool} = pkg
const pool = new Pool({
  connectionString: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?sslmode=${process.env.DB_SSL_MODE}`,
});

pool.connect((err)=>{
  if(err){
    console.log('connection error' , err.stack)
  }
  else{
    console.log('connected')
  }
}); 

export default pool ; 