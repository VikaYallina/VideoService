// import Sequelize from 'sequelize'
const Sequelize = require('sequelize')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase().concat(string.slice(1))
}

    class OwnModel extends Sequelize.Model {
        async fill(values) {
            const attributes = this.constructor.tableAttributes
            const associations = this.constructor.associations
            const getFilledModelInstance = async ({model, data}) => {
                let modelInstance = data

                if (!(modelInstance instanceof model)) modelInstance = new model()

                return modelInstance.fill(data)
            }

            if (this.associationsData === undefined) this.associationsData = {}

            for (const key in values) {
                console.log({key, value: values[key]})
                const association = associations[key]
                const value = values[key]

                if (!association) {
                    if (attributes[key] !== undefined) this.setDataValue(key, value)
                    else this[key] = value
                    continue
                }

                const model = association?.target

                this.associationsData[key] =
                    Array.isArray(value) === true
                        ? await Promise.all(
                            value.map(data => getFilledModelInstance({model, data}))
                        )
                        : await getFilledModelInstance({model, data: value})
            }

            this.isNewRecord = this.getIsNewRecord()
            console.log(this.isNewRecord)

            return this
        }

        getThroughModelsName() {
            const associations = this.constructor.associations
            const throughModelsName = []

            for (const associationName in associations) {
                const association = associations[associationName]

                if (association.throughModel !== undefined)
                    throughModelsName.push(association.throughModel.name)
            }

            return throughModelsName
        }

        async deepSave({parent, associationName} = {}) {
            let modelInstance = this

            const associationsData = modelInstance.associationsData ?? {}

            if (modelInstance.isNewRecord === true && parent) {
                const createMethodName = parent.constructor.getMethodName(
                    'create',
                    associationName,
                    'singular'
                )
                const createValue = modelInstance?.toObject?.() ?? modelInstance
                const throughModelsName = parent.getThroughModelsName()
                let createOptions = {}

                throughModelsName.some(throughModelName => {
                    const throughValue = modelInstance[throughModelName]

                    if (throughValue !== undefined) {
                        createOptions = {
                            through: throughValue
                        }

                        return true
                    }

                    return false
                })

                modelInstance = await parent[createMethodName](createValue.dataValues, createOptions)
            } else {
                console.log(modelInstance)
                await modelInstance.save()
            }

            for (const associationName in associationsData) {
                let value = associationsData[associationName]

                value =
                    Array.isArray(value) === true
                        ? await Promise.all(
                            value.map(item =>
                                item.deepSave({
                                    parent: modelInstance,
                                    associationName
                                })
                            )
                        )
                        : await value.deepSave({
                            parent: modelInstance,
                            associationName
                        })
                console.log("VALuE:", value)
                const setMethodName = modelInstance.constructor.getMethodName(
                    'set',
                    associationName
                )

                await modelInstance?.[setMethodName]?.(value)
            }

            return modelInstance
        }

        async fillAndSave(values) {
            await this.fill(values)

            return this.deepSave()
        }

        getIsNewRecord() {
            const primaryKeyAttributes = this.constructor.primaryKeyAttributes ?? []

            if (primaryKeyAttributes.length === 0) return

            return primaryKeyAttributes.some(primaryKeyAttribute =>
                [undefined, null].includes(this[primaryKeyAttribute])
            )
        }

        static getMethodName(prefix = '', value = '', mode) {
            let methodName = value

            switch (mode) {
                case 'plural':
                case 'pluralize':
                    const {plural: pluralize} = require('pluralize')

                    methodName = pluralize(methodName)
                    break

                case 'singular':
                case 'singularize':
                    const {singular: singularize} = require('pluralize')

                    methodName = singularize(methodName)
                    break
            }

            methodName = capitalizeFirstLetter(methodName)
            methodName = `${prefix}${methodName}`

            return methodName
        }
    }

    module.exports = {OwnModel:OwnModel}