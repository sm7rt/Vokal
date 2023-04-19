import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ownerSelector } from '../../authentication/redux/AuthenticationRedux';
import { IRootState } from '../../../common/models/StateModel';
import CasinoActions, {
  casinoFromListSelector
} from '../../casinos/redux/CasinosRedux';
import { initialize } from 'redux-form';
import SettingsConstants from '../constants/SettingsConstants';
import countryCode from '../../../utils/data/countryCode.json';

export const useFillCasinoSettingsForm = () => {
  const dispatch = useDispatch();
  const owner = useSelector(ownerSelector);
  const casino = useSelector((state: IRootState) =>
    casinoFromListSelector(state, owner.managedCasinoId)
  );

  // Fetch Casino Details
  useEffect(() => {
    owner &&
      dispatch(CasinoActions.fetchCasinoDetailsRequest(owner.managedCasinoId));
  }, [dispatch, owner]);

  // Initialize Form
  useEffect(() => {
    casino &&
      dispatch(
        initialize(SettingsConstants.FORM_SETTINGS, {
          brandLogo: {
            imageUrl: casino.resizedUrl || ''
          },
          name: casino.name,
          webSite: casino.webSite,
          mailContact: casino.mailContact,
          telephoneNumber: casino.telephoneNumber,
          address: {
            streetAddress: casino.address,
            country: casino.country,
            countryCode:
              casino.countryCode && casino.countryCode.length > 2
                ? countryCode[casino.countryCode]
                : casino.countryCode,
            city: casino.city,
            postalCode: casino.postalCode,
            state: casino.state
          },
          mainCurrency: casino.mainCurrency,
          minimumAgeEntrance: casino.minimumAgeEntrance,
          dressCode: casino.dressCode
        })
      );
  }, [casino, dispatch]);
  return true;
};
