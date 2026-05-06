CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'client');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
    CREATE TYPE user_status AS ENUM ('pending', 'approved', 'rejected');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'terminal_kit_state') THEN
    CREATE TYPE terminal_kit_state AS ENUM ('active', 'deactivated_temp', 'deactivated_perm');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'action_type') THEN
    CREATE TYPE action_type AS ENUM ('activate', 'deactivate_temp', 'deactivate_perm');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'action_status') THEN
    CREATE TYPE action_status AS ENUM ('pending_admin', 'pending_provider', 'completed', 'failed');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'provider_request_status') THEN
    CREATE TYPE provider_request_status AS ENUM ('pending', 'partial_success', 'completed', 'failed');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL,
  status user_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS terminal_kits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  terminal_kit TEXT NOT NULL UNIQUE,
  current_state terminal_kit_state,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS provider_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT NOT NULL,
  status provider_request_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS terminal_kit_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  terminal_kit_id UUID NOT NULL REFERENCES terminal_kits(id),
  action_type action_type NOT NULL,
  status action_status NOT NULL DEFAULT 'pending_admin',
  previous_state terminal_kit_state,
  resulting_state terminal_kit_state,
  client_request_id UUID NOT NULL REFERENCES client_requests(id),
  provider_request_id UUID REFERENCES provider_requests(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_client_requests_user_id ON client_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_terminal_kit_actions_status ON terminal_kit_actions(status);
CREATE INDEX IF NOT EXISTS idx_terminal_kit_actions_provider_request_id ON terminal_kit_actions(provider_request_id);
