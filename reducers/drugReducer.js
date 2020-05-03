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
  'zolvit', 'zutripro', 'zydone', 'test', 'codeine','captain cody','cody','lean','schoolboy','sizzurp','purple drank', 'doors & fours','loads','pancakes and syrup','fentanyl','actiq','duragesic','sublimaze','apache','china girl','china white','dance fever','friend','goodfella','jackpot','murder 8','tango and cash','tnt','hydrocodone','vicodin','lortab','lorcet','vike','watson-387','hydromorphone','dilaudid','d','dillies','footballs','juice','smack','meperidine','demerol','demmies','pain killer','methadone','dolophine®','methadose','amidone','fizzies with mdma','chocolate chip cookies','morphine','duramorph','roxanol','m','miss emma','monkey','white stuff','oxycodone','oxycontin','percodan','percocet','o.c.','oxycet','oxycotton','oxy','hillbilly heroin','percs','oxymorphone','opana','biscuits','blue heaven','blues','mrs.o','o bomb','octagons','stop signs' ]
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
