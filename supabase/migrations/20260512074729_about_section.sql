CREATE TABLE about (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    experience INTEGER NOT NULL,
    completed_projects INTEGER NOT NULL,
    customer_satisfaction INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
