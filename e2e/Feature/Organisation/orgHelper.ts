import * as request from 'request';
import { Organisation } from '../../../src/app/Data/organisation';


export class OrgHelper {

  private _organisationsApiEndPoint: string = 'http://webrota.iainbowler.com/api/organisations/';
  private _findOrganisationsApiEndPoint: string = 'http://webrota.iainbowler.com/api/organisations/find/';

  get createOrgName(): string {
    return 'Create Org';
  }

  get basicOrgName(): string {
    return 'Basic Org';
  }

  create(org: Organisation): Promise<Organisation> {
    return new Promise<Organisation>((resolve, reject) => {

      const options = { url: this._organisationsApiEndPoint,
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: org,
                        json: true
      };

      request(options, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(new Organisation(body.name, body.ownerId, body.members, body.id));
        }
      });
    });
  }

  deleteByName(name: string): Promise<Organisation> {
    return new Promise<Organisation>((resolve, reject) => {
      this.findOrganisationByName(name).then((org) => {
        const options = { url: this._organisationsApiEndPoint + org.id,
                          method: 'DELETE',
                          headers: { 'content-type': 'application/json' },
                          json: true
        };

        request(options, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(org);
          }
        });
      });
    });
  }

  findOrganisationByName(name: string): Promise<Organisation> {
    return new Promise<Organisation>((resolve, reject) => {

      const org = new Organisation();
      const options = { url: this._findOrganisationsApiEndPoint + '?orgName=' + name,
                        method: 'GET',
                        headers: { 'content-type': 'application/json' },
                        body: org,
                        json: true
      };

      request(options, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(new Organisation(body.name, body.ownerId, body.members, body.id));
        }
      });
    });
  }
}
