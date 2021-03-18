# Ember Portal Blueprints

This repo contains a collection of blueprints to help build consistent awesome Sauce Portals.

## Portal

`ember g portal {name}`

WARNING: This generator is mega destructive and should be ran at the start of a project. It will do things like blow away your package.json file 😱

This generator will set up the basic authentication routes, mirage, tests, add-ons and core ui components.

## CRUD

`ember g crud {model} {attributes...}`

Generates the 5 basic routes for a model CRUD.

- List
- Create
- View
- Update
- Delete

The crud will also create some basic model based components, mirage seeds and endpoints and acceptance tests.

## Crumbs

`ember g crumbs {model}`

Generates a model crumb component. No biggie

## Details

Generates a detail component for a given model and attributes.

`ember g details {model} {attributes...}`

## Filter

Generates a filter component for a given model and attributes.

`ember g filter {model} {attributes...}`

## Form

Generates a form component for a given model and attributes.

`ember g form {model} {attributes...}`

## List

Generates a list component for a given model and attributes.

`ember g list {model} {attributes...}`
