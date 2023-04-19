import React from 'react';
import zxcvbn from 'zxcvbn';
import './PasswordStrengthMeter.css';

type PasswordStrengthMeterProps = {
  password: string;
};

const strongLevel = ['Too Weak', 'Medium', 'Good', 'Great'];

/**
 *
 */
const PasswordStrengthMeter = (props: PasswordStrengthMeterProps) => {
  const { password } = props;

  /**
   * Create Password Label
   * @param result : The result from zxcvbn
   */
  const createPasswordLabel = (result: any) => {
    switch (result.score) {
      case 0:
        return strongLevel[0];
      case 1:
        return strongLevel[0];
      case 2:
        return strongLevel[1];
      case 3:
        return strongLevel[2];
      case 4:
        return strongLevel[3];
      default:
        return strongLevel[0];
    }
  };

  // Get Score ClassNames
  const getScoreClassName = (score: number) => `strength${score}`;

  /**
   * Render
   */
  if (password) {
    const testedResult = zxcvbn(password);
    return (
      <div className="d-flex flex-row justify-content-between align-items-center password-length">
        <div className="d-flex flex-row justify-content-between align-items-center">
          {strongLevel.map((level: string, index: number) => (
            <div
              className={`progress strength ${
                index === 0 || index <= testedResult.score - 1
                  ? getScoreClassName(testedResult.score)
                  : 'strength-empty'
              }`}
              key={index}
            >
              <div
                className={`progress-bar ${
                  index === 0 || index <= testedResult.score - 1 ? 'w-100' : ''
                }`}
                role="progressbar"
                aria-valuenow={
                  index === 0 || index <= testedResult.score - 1 ? 100 : 0
                }
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          ))}
        </div>
        <label className={`label mb-0`}>
          {createPasswordLabel(testedResult)}
        </label>
      </div>
    );
  }
  return null;
};

export default PasswordStrengthMeter;
