import { Client } from '@hubspot/api-client';
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/companies';

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

export async function createOrUpdateContact(formData: any) {
  try {
    const properties = {
      email: formData.email,
      firstname: formData.name ? formData.name.split(' ')[0] : '',
      lastname: formData.name ? formData.name.split(' ').slice(1).join(' ') : '',
      phone: formData.phoneNumber,
      // Add more properties as needed
    };

    // Check if the contact already exists
    const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
      filterGroups: [{
        filters: [{ propertyName: 'email', operator: FilterOperatorEnum.Eq, value: formData.email }]
      }],
      properties: ['email'],
      limit: 1, // Add a limit to the number of results
      after: '0', // Pagination offset
      sorts: [] // Sorting criteria
    });

    if (searchResponse.results.length > 0) {
      // Contact exists, update it
      const contactId = searchResponse.results[0].id;
      const updateResponse = await hubspotClient.crm.contacts.basicApi.update(contactId, { properties });
      return updateResponse;
    } else {
      // Contact does not exist, create it
      const createResponse = await hubspotClient.crm.contacts.basicApi.create({
        properties,
        associations: []
      });
      return createResponse;
    }
  } catch (error) {
    console.error('Error creating or updating contact in HubSpot:', error);
    throw error;
  }
}