using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using Model;
using System.IO;
using System.Collections;

namespace AgVs2017cp.Controllers
{
    public class FileUploadController : BaseApiController
    {
        // Both api method works thou with slightly different signature and returns.
        // one does file save to hdd and the other loads it into memory stream.


        [HttpPost, Route("api/FileUpload/")]
        public Task<HttpResponseMessage> PostFile() //HttpResponseMessage or IHttpActionResult?
        {
            HttpRequestMessage request = this.Request;
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            //string root = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/uploads");
            var root = @"d:\temp\";

            var provider = new MultipartFormDataStreamProvider(root);

            var task = request.Content.ReadAsMultipartAsync(provider).
                ContinueWith(o => // was <HttpResponseMessage> before bracket start.
                {
                    // BodyPartFileNames was changed in the RTM release, now use the FileData property.
                    // this is the path/filename on the server where the file was saved 
                    var file1 = provider.FileData.First().LocalFileName;

                    var actualFileName = provider.FileData.First().Headers.ContentDisposition.FileName;
                    if (actualFileName.StartsWith("\"") && actualFileName.EndsWith("\""))
                        actualFileName = actualFileName.Trim('"');

                    File.Copy(file1, root + actualFileName);

                    return new HttpResponseMessage()
                    {
                        Content = new StringContent("File uploaded.")
                    };
                }
            );
            return task;
        }


        [HttpPost, Route("api/upload2")]
        public async Task<IHttpActionResult> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);
            foreach (var file in provider.Contents)
            {
                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                var buffer = await file.ReadAsByteArrayAsync();
                //Do whatever you want with filename and its binaray data.
            }

            return Ok();
        }



        // POST: api/FileUpload
        // Some casting issue code not use.
        //public async Task<IList<FileDesc>> Post()
        //{
        //    List<FileDesc> result = new List<FileDesc>();
        //    var PATH = @"d:\temp\";

        //    if (Request.Content.IsMimeMultipartContent())
        //    {
        //        try
        //        {
        //            if (!Directory.Exists(PATH)) {Directory.CreateDirectory(PATH); }

        //            MultipartFormDataStreamProvider stream = new MultipartFormDataStreamProvider(PATH);

        //            IEnumerable<HttpContent> bodyparts = await Request.Content.ReadAsMultipartAsync(stream);
        //            //IDictionary<string, string> bodyPartFiles = stream.FileData;
        //            ICollection < MultipartFileData > bodyPartFiles = stream.FileData;
        //            IList<string> newFiles = new List<string>();

        //            foreach (var item in bodyPartFiles)
        //            {
        //                var newName = string.Empty;
        //                var file = new FileInfo(item.LocalFileName);

        //                // item.Key does not exist here. need to debug to see what's the value in item.
        //                //if (item.Key.Contains("\""))
        //                //    newName = Path.Combine(file.Directory.ToString(), item.Key.Substring(1, item.Key.Length - 2));
        //                //else
        //                //    newName = Path.Combine(file.Directory.ToString(), item.Key);

        //                File.Move(file.FullName, newName);
        //                newFiles.Add(newName);
        //            }

        //            var uploadedFiles = newFiles.Select(i =>
        //            {
        //                var fi = new FileInfo(i);
        //                return new FileDesc(fi.Name, fi.FullName, fi.Length);
        //            }).ToList();

        //            result.AddRange(uploadedFiles);
        //        }
        //        catch (Exception){}
        //    }
        //    return result;
        //}


    } // End: public class FileUploadController : ApiController
}

