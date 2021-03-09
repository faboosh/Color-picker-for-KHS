const fs = require('fs')
const { setFdLimit } = require('process')
const helpers = require('./helpers')

const FILE_PATH = './PhasePlant2.svg'

let svg = fs.readFileSync(FILE_PATH, {encoding:'utf8', flag:'r'})

const styles = helpers.findStyles(svg)

const parsed = helpers.parseStyles(styles)

fs.writeFileSync('./output.json', JSON.stringify(parsed), { encoding: 'UTF-8' })