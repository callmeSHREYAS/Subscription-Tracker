const {Client : WorkflowClient}= require('@upstash/workflow')

const workflowClient = new WorkflowClient({
    baseUrl : process.env.QSTASH_URL,
    token : process.env.QSTASH_TOKEN
})

module.exports = workflowClient