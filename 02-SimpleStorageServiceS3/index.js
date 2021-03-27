const express = require("express");
const app = express();
const port = 3000;

const {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

// Crear un cliente de S3
const s3 = new S3Client({ region: "sa-east-1" });

app.get("/list-buckets", async (req, res) => {
  const response = await s3.send(new ListBucketsCommand({}));
  res.send(response.Buckets);
});

app.get("/list-files/:bucketName", async (req, res) => {
  const bucketName = req.params.bucketName;
  const response = await s3.send(new ListObjectsV2Command({ Bucket: bucketName }));
  res.send(response.Contents);
});

app.get("/add-file/:bucketName", async (req, res) => {
  const bucketName = req.params.bucketName;
  const keyName = `new-file-${new Date().toISOString()}.txt`;
  const objectParams = {
    Bucket: bucketName,
    Key: keyName,
    Body: "Util Apis - New File!",
  };
  const response = await s3.send(new PutObjectCommand(objectParams));
  res.send(response);
});

app.get("/download-file/:bucketName/:keyName", async (req, res) => {
  const bucketName = req.params.bucketName;
  const keyName = req.params.keyName;
  const objectParams = { Bucket: bucketName, Key: keyName };
  const response = await s3.send(new GetObjectCommand(objectParams));

  res.setHeader("Content-disposition","attachment; filename=utilapis-document.txt");
  res.setHeader("Content-type", "text/plain");
  response.Body.pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/list-buckets`);
});
