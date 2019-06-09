import { DraftState } from '../../components/admin/store/admin.state';
import { ClientState } from './client.state';

export interface AppState {
  client: ClientState;
  admin: DraftState;
}
