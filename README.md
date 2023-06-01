# deppy

Small CLI tool that parses dependency file into csv format.

Currently only supports node projects.

## Usage

`npx @ariito/deppy --dir <path to package.json>`

Optional arguments:
These are the columns that can be customised via arguments

`--repo <string>`
`--updatedBy <string>`
`--teamLead <string>`

## TODO

- Allow for setup of csv columns - for now this is hard coded
- Allow for setting of notes/comments on a per dep basis
- Identity the language used for the dependency
- Parse dependencies of dependencies (specify dependency tree depth)
- And more...
