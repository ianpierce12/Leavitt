let filesystem = {
    name: 'fileSystemRoot',
    contents: [],
    type: 'file-system'
}

function createTextFile (name) {
    return {
        type: 'text-file',
        contents: null,
        name: name
    }
    
}

function setFileContents (file, contents) {
    file.contents = contents
}

function readFileContents (file) {
    return file.contents
}

function createDirectory (name) {
    return {
        type: 'directory',
        contents: [],
        name: name
    }
}

function addToDirectory (directory, toBeAdded) {
    if (directory.type === 'directory' || directory.type === 'file-system') {
        directory.contents.push(toBeAdded)
    } else {
        console.log('Please pass in a directory')
    } 
}

function zip (toBeZipped) {
    return {
        type: 'zip-file',
        contents: toBeZipped.contents,
        name: toBeZipped.name + '.zip'
    }
}

function unzip (toBeUnzipped) {
    if (toBeUnzipped.type === 'zip-file') {
        let zipType = typeof toBeUnzipped
        if (zipType === "object") {
            return {
                type: 'directory',
                contents: toBeUnzipped.contents,
                name: toBeUnzipped.name.slice(0, -4)
            }
        } else {
            return {
                type: 'text-file',
                contents: toBeUnzipped.contents,
                name: toBeUnzipped.name.slice(0, -4)
            }
        }
    }
}

function deleteItem (directory, index) {
    if(directory.type === 'directory' || directory.type === 'file-system')
    directory.contents.splice(index, index)
}

function copy (toBeCoppied) {
    return toBeCoppied
}

function move (initialDirectory, index, newDirectory) {
    let toBeMoved = initialDirectory.contents[index]
    initialDirectory.contents.splice(index, index)
    newDirectory.contents.push(toBeMoved)
}

// This function could traverse deeper into nested directories and return a file count or sum of the file sizes
function getDirectorySize (directory) {
    if (directory.type === 'directory') {
        return directory.contents.length
    } else {
        console.log('Not a directory')
    }
}

function getFileSize (file) {
    if (file.type === 'text-file') {
        return file.contents.length
    } else {
        console.log('Not a file')
    }
}

console.log('filesystem', filesystem)

let tf1 = createTextFile('tf1')
setFileContents(tf1, 'text file 1')
console.log('reading contents of tf1: ', readFileContents(tf1))
addToDirectory(filesystem, tf1)
console.log('fileysystem should have a file called tf1', filesystem)
let dir1 = createDirectory('dir1')
addToDirectory(filesystem, dir1)
console.log('filesystem should have a directory called dir1', filesystem)
let zippedFile = zip(filesystem.contents[0]) 
addToDirectory(filesystem.contents[1], zippedFile)
console.log('dir1 should contain a zipped file', filesystem.contents[1])
let zippedFolder = zip(filesystem.contents[1])
addToDirectory(filesystem, zippedFolder)
console.log('file system should have a zipped folder named dir1.zip', filesystem)
let unzipped = unzip(filesystem.contents[2])
addToDirectory(filesystem, unzipped)
console.log('file system should now have two directories named dir1', filesystem)
deleteItem(filesystem, 3)
console.log('file system should only have one directory named dir1', filesystem)
let copied = copy(filesystem.contents[0])
addToDirectory(filesystem, copied)
console.log('file system should have two files named tf1', filesystem)
move(filesystem, 3, filesystem.contents[1])
console.log('file system should have one file named tf1 and dir1 should contain a file named tf1\n', 'filesystem: ', filesystem, '\ndir1: ', filesystem.contents[1])
console.log('directory size of dir1 should be 2:', getDirectorySize(filesystem.contents[1]))
console.log('file size of tf1 should be 11:', getFileSize(filesystem.contents[0]))
