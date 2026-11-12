// The AWS services Stratus emulates, grouped for the "Available services"
// section. The source of truth is the Stratus repo: one entry per package in
// internal/services that internal/app/stack.go wires into the server. Keep
// this list in step with it when a service ships; the stat band and section
// heading derive their count from here.

/** How a service is backed, when that is worth calling out on the site. */
export type ServiceBacking = "docker" | "emulated";

export type Service = {
  name: string;
  /** What you can do with it today, in a few words. */
  summary: string;
  backing: ServiceBacking;
  /** A short label for something notable, e.g. a feature AWS itself lacks locally. */
  highlight?: string;
};

export type ServiceGroup = {
  id: string;
  title: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "compute",
    title: "Compute",
    services: [
      {
        name: "Lambda",
        summary: "Functions run on AWS's own base images: Python, Node.js, Java, Ruby, .NET, Go, Rust and container images",
        backing: "docker",
        highlight: "Real runtimes",
      },
      { name: "Step Functions", summary: "State machines with Choice, Map and Parallel states and Lambda tasks", backing: "emulated" },
      { name: "ECS", summary: "Clusters, task definitions, services and tasks", backing: "emulated" },
      { name: "ECR", summary: "Repositories and images", backing: "emulated" },
    ],
  },
  {
    id: "data",
    title: "Storage and databases",
    services: [
      { name: "S3", summary: "Buckets and objects, with hard-linked snapshots for large blobs", backing: "emulated" },
      { name: "DynamoDB", summary: "Tables, items, queries and batch writes", backing: "emulated" },
      { name: "DynamoDB Streams", summary: "Change streams that trigger Lambda", backing: "emulated" },
      {
        name: "RDS",
        summary: "Real PostgreSQL, MySQL and MariaDB; data survives snapshots",
        backing: "docker",
        highlight: "Real engine",
      },
      {
        name: "ElastiCache",
        summary: "Real Valkey/Redis and Memcached; keys survive snapshots",
        backing: "docker",
        highlight: "Real engine",
      },
    ],
  },
  {
    id: "messaging",
    title: "Messaging and events",
    services: [
      { name: "SQS", summary: "Standard and FIFO queues, with Lambda triggers", backing: "emulated" },
      { name: "SNS", summary: "Topics with fan-out to SQS queues and Lambda functions", backing: "emulated" },
      { name: "EventBridge", summary: "Buses, rules and targets", backing: "emulated" },
      {
        name: "EventBridge Scheduler",
        summary: "One-off and recurring schedules",
        backing: "emulated",
        highlight: "Fast-forward clock",
      },
      { name: "Kinesis", summary: "Data streams, with Lambda triggers", backing: "emulated" },
      {
        name: "MSK",
        summary: "A Kafka-compatible Redpanda broker any Kafka client can use",
        backing: "docker",
        highlight: "Real broker",
      },
      {
        name: "SES",
        summary: "v1 and v2 sending APIs; every email lands in an inbox you can read",
        backing: "emulated",
        highlight: "Captured inbox",
      },
    ],
  },
  {
    id: "networking",
    title: "Networking and APIs",
    services: [
      { name: "API Gateway REST", summary: "REST APIs, resources and methods", backing: "emulated" },
      { name: "API Gateway v2", summary: "HTTP APIs and routes", backing: "emulated" },
      { name: "ELBv2", summary: "Load balancers, listeners and target groups", backing: "emulated" },
      {
        name: "Route 53",
        summary: "Hosted zones and record sets",
        backing: "emulated",
        highlight: "Queryable DNS",
      },
      { name: "Cloud Map", summary: "Namespaces, services and instances, published as Route 53 records", backing: "emulated" },
      { name: "ACM", summary: "Certificates", backing: "emulated" },
    ],
  },
  {
    id: "security",
    title: "Security and identity",
    services: [
      {
        name: "IAM",
        summary: "Users, roles, access keys and managed policies",
        backing: "emulated",
        highlight: "Opt-in enforcement",
      },
      { name: "STS", summary: "Caller identity and AssumeRole", backing: "emulated" },
      { name: "KMS", summary: "Keys, aliases, encrypt and decrypt", backing: "emulated" },
      { name: "Secrets Manager", summary: "Secrets and versions", backing: "emulated" },
      { name: "Cognito", summary: "User pools, users, groups and sign-in", backing: "emulated" },
    ],
  },
  {
    id: "operations",
    title: "Management and observability",
    services: [
      { name: "CloudFormation", summary: "Stacks and change sets", backing: "emulated" },
      { name: "CloudWatch Logs", summary: "Log groups, streams and events", backing: "emulated" },
      { name: "CloudWatch Metrics", summary: "Put and query metric data", backing: "emulated" },
      { name: "SSM Parameter Store", summary: "Put, get, describe and tag parameters", backing: "emulated" },
      {
        name: "Fault Injection Service",
        summary: "Your FIS experiment templates, run against Stratus unchanged",
        backing: "emulated",
        highlight: "Seeded chaos",
      },
    ],
  },
  {
    id: "ai",
    title: "AI",
    services: [
      {
        name: "Bedrock Runtime",
        summary: "Record real model answers once, replay them offline in every test run",
        backing: "emulated",
        highlight: "Record and replay",
      },
    ],
  },
];

export const allServices: Service[] = serviceGroups.flatMap((g) => g.services);

export const serviceCount = allServices.length;

export const dockerBackedServices: Service[] = allServices.filter((s) => s.backing === "docker");
