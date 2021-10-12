const consola = require('consola');
const discord = require('discord.js');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const { exec } = require("child_process");

const question = [
    {
        type: "input",
        name: "dir",
        message: "> Bot Dir > "
    },

    {
        type: "input",
        name: "dname",
        message: "> Bot Name >"
    },

    {
        type: "password",
        name: "dtoken",
        message: "> Bot Token >"
    },

    {
        type: "input",
        name: "dprefix",
        message: "> Bot Prefix >"
    }
]

/**
 * 
 * @param {String} token 
 * @param {String} prefix 
 * Create the file for you in the dir file
*/
async function fileCreate(name, token, prefix, dir) {
    exec(`cd ${dir} && mkdir ${name} && cd ${name} && mkdir commands && mkdir events && mkdir base`)

    let config = {}
    fs.readFile('./example/config.txt', "utf8", (err, data) => {
        if (err) {
            console.log(err)
        }
        config = data
        config = data.replace('[[token]]', token).replace('[[prefix]]', prefix)

        try {
            fs.writeFileSync(dir + name, config)
        } catch (err) {
            console.log(err)
            return
        }
    })
}

async function startup() {
    inquirer
        .prompt(question)
        .then((answer) => {
            console.log(answer)
            fileCreate(answer.dname, answer.dtoken, answer.dprefix, answer.dir)
        })
}

startup()