import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Organization } from "../../features/organizations/Organization";

interface OrganizationCardProps {
  organizationData: Organization;
}

export default function OrganizationCard({
  organizationData
}: OrganizationCardProps) {
  return (
    <Card key={organizationData.id} style={{ maxWidth: "256px" }}>
      <Card.Body>
        <Card.Title>{organizationData.name}</Card.Title>
        <Card.Text>Number of open tasks for you:1</Card.Text>
        <Link to={`/organizations/${organizationData.id}/dashboard`}>
          Visit organization
        </Link>
      </Card.Body>
    </Card>
  );
}
