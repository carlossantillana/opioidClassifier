import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
  drugName: '',
  isOpioid:  false,
  opioids: ['abstral', 'fentanyl', 'acitq', 'avinza', 'morphine', 'butrans', 'demerol',
  'buprenorphine', 'demerol', 'meperidine', 'isonipecaine', 'pethidine', 'dilaudid',
  'hydromorphone', 'dihydromorphone', 'dolophine', 'methadone', 'dolophine', 'methadone',
  'duragestic', 'fentanyl', 'fentora', 'hysingia', 'hydrocodone', 'methadose', 'morphabond',
  'nucynta', 'nucynta er', 'tapentadol', 'onsolis', 'oramorph', 'oxaydo', 'roxonol-t', 'roxonol',
  'roxonol t', 'sublimaze', 'oxycodone', 'xtampza', 'xtampza er', 'zohydro er', 'zohydro',
  'anexsia', 'co-gesic', 'cogesic', 'embedia', 'exalgo', 'hycet', 'hycodan', 'hydromet', 'ibudone',
  'kadian', 'liquicet', 'lorcet', 'lortab', 'maxidone', 'ms contin', 'norco', 'opana er', 'oxycontin',
  'oxycet', 'palladone', 'percocet', 'percodan', 'reprexain', 'rezira', 'roxicet', 'targiniq er',
  'tussicaps', 'tussionex', 'tuzistra xr', 'vicodin', 'vicoprofen', 'vituz', 'xartemis', 'xodol',
  'zolvit', 'zutripro', 'zydone', 'test']
};
export default function(state=INITIAL_STATE, action){
  switch (action.type) {
    case "CheckDrug":
      let drug = action.payload
      drug = drug.toLowerCase();
      if (state.opioids.includes(drug)){
        Actions.isOpioid({drug: drug})
      } else{
        Actions.isNotOpioid({drug: drug})
      }
      state.drugName = action.payload
      return state;
        break;
  default:
    return state;
  }
}
