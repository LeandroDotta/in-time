import { formatDate, formatTime } from '../utils/format-utils.js';
import { Timestamp } from '../timestamp.js';
import { HistoryTableView } from '../view/history-table-view.js';
import * as repository from '../repository/time-entry-repository.js';

const entries = repository.getAll();
const historyTable = new HistoryTableView(document.body, entries);