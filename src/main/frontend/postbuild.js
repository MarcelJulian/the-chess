var console = require('console');
var exec = require('child_process').exec;
var os = require('os');

function puts(error, stdout, stderr) { 
	if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
 }

// Run command depending on the OS
if (os.type() === 'Linux') 
   exec("rm -rf ../resources/static/* && mkdir -p ../resources/static && cp -r build/* ../resources/static", puts); 
else if (os.type() === 'Windows_NT') 
   exec("rmdir ..\\resources\\static /q /s && mkdir ..\\resources\\static && xcopy .\\build ..\\resources\\static /q /s /e", puts);
else
   throw new Error("Unsupported OS found: " + os.type());