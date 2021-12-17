import React from "react";
import { useAppSelector } from "../../app/hooks";
import OrganizationCard from "../Organization/OrganizationCard";

export default function ClientOrganizations() {
  const clientOrganizations = useAppSelector(
    (state) => state.organizationsSlice
  );
  return (
    <div>
      {clientOrganizations.organizations ? (
        clientOrganizations.organizations.map((organization) => (
          <OrganizationCard
            key={organization.id}
            organizationData={organization}
          />
        ))
      ) : (
        <div> You have no active workspaces.</div>
      )}
    </div>
  );
}
