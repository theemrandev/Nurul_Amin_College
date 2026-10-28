# SQLite Migrations Archive (Phases 2 - 4)

This directory preserves the historical development migrations generated during local development and offline security testing with SQLite.

## Migration Sequence:
1. `20261028102011_init_admin`: Initial User schema and single Main Admin support.
2. `20261028111819_add_student_management`: Student schema, roll uniqueness, and creator relations.
3. `20261028125140_security_hardening_restrict_audit`: Audit logging model and `onDelete: Restrict` protection.
4. `20261028132732_add_teacher_management`: Faculty Directory & Teacher CRUD model.

## Note:
These migrations are archived for audit trail and compliance. They use SQLite-specific DDL (`PRAGMA`, `DATETIME`).
For production deployment on Neon PostgreSQL, Prisma uses the active migrations in `prisma/migrations/`.
