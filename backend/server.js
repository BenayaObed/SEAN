const express = require("express");
const supabase = require("@supabase/supabase-js");

const app = express();
app.use(express.json());
const PORT = 3211;

const SUPABASE_URL = "https://ulypfghgmwdabsrvqzed.supabase.co";
const SUPABASE_SERVICE_ROLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseXBmZ2hnbXdkYWJzcnZxemVkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTcwMTQyMCwiZXhwIjoyMDI3Mjc3NDIwfQ.Z8T8R4xt94MvpqIEObp5UbZPJ5twpfYaj6a8eFhVnsk"

const db = supabase.createClient(SUPABASE_URL,SUPABASE_SERVICE_ROLE);

// app.get("/:username" , (request, response) =>{
//   const {username} = request.params;
//   console.log(username)
//   console.log("API endpoint utama dakses");
//   response.send("Ini adalah route utama")
// })
app.get("/" , async(request, response) =>{
  const getBlog = await db.from('blog').select();
  response.json({getBlog})
})

app.post("/", async (request, response)=>{
  const {title,description} = request.body
  const createPost = await db.from("blog").insert({title, description})
  console.log("app.post ~ createPost:",createPost)
  response.send({createPost})
})

app.listen(PORT, () => {
  console.log("server running in port ", PORT)
})